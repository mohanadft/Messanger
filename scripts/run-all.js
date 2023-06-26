const scripts = require("../package.json").scripts;
const spawnCmd = require("spawn-command");
const { c } = require("./console-colors");
const psTree = require('ps-tree');

const killTree = (pid, signal, callback) => {
  signal = signal || "SIGKILL";
  callback = callback || function () {};
  psTree(pid, (_err, children) => {
    [pid, ...children.map((p) => p.PID)].forEach((tpid) => {
      try {
        process.kill(tpid, signal);
      } catch (ex) {}
    });
    callback();
  });
};

const isFlag = arg => arg.startsWith("-");

const args = process.argv.slice(2).filter(arg => !isFlag(arg));

const logs = {};
let selectedLogId = "";

const updateDisplayedLog = () => {
  console.clear();
  // Rerendering the selected log
  process.stdout.write(logs[selectedLogId].log);
  // Displaying available commands
  process.stdout.write(
    c`$[bg-white]$[bold]$[black] Controls: $[reset] $[bold]$[red]q$[reset]: quit${
    "     "
    }$[bold]$[green]n$[reset]: next${
    "     "
    }$[bold]$[blue]p$[reset]: previous${
    "     "
    }$[bold]$[yellow]r$[reset]: refresh${
    "     "
    }Current:$[bold]$[cyan]${
      Object.keys(logs).indexOf(selectedLogId) + 1
    }$[reset]/${Object.keys(logs).length}(${selectedLogId})`
  );
};

const childProcesses = {};
args.forEach(arg => {
  // Preparing a regex pattern for the wildcard pattern
  const wildcardPos = arg.indexOf("*");
  const wildCardPrefix = arg.slice(0, wildcardPos),
    wildCardSuffix = arg.slice(wildcardPos + 1);
  const ptr = new RegExp(`${wildCardPrefix}(.*?)${wildCardSuffix}`);

  for (let scriptName in scripts) {
    // ignore scripts that does not match the wildcard pattern
    if (!ptr.test(scriptName)) continue;
    const script = scripts[scriptName];
    const child = spawnCmd(script);
    logs[scriptName] = { log: "" };
    child.stdout.on("data", data => {
      logs[scriptName].log += data;
      if (scriptName === selectedLogId) updateDisplayedLog();
    });
    child.on("exit", () => {
      process.stdout.write(c`\n$[white][$[yellow]info$[white]]$[cyan] Script '${scriptName}' has exited.`);
    });
    childProcesses[child.pid] = child;
    selectedLogId = scriptName;
    updateDisplayedLog();
  }
});

process.stdin.setRawMode(true);
process.stdin.setEncoding("utf8");

process.stdin.on("data", key => {
  let logIdx = Object.keys(logs).indexOf(selectedLogId);

  // Quitting
  if (key === "\u0003" || key === "q")
  {
    // Killing all of the childprocesses
    for(let child in childProcesses){
      killTree(child, 0, ()=>{
        delete childProcesses[child];
      });
    }
    // Waiting for all child processes to terminate
    setInterval(()=>{
      if(Object.keys(childProcesses).length === 0) {
        process.stdout.write(c`\n$[white][$[yellow]info$[white]]$[cyan] All children have been terminated, exiting.....$[reset]`);
        process.exit();
      }
    },100);
  }
  // Log of the next command
  else if (key === "n") {
    logIdx = Math.min(Object.keys(logs).length - 1, logIdx + 1);
  }
  // Log of the previous command
  else if (key === "p") {
    logIdx = Math.max(0, logIdx - 1);
  }
  // Referesh the current command log
  else if (key === "r") updateDisplayedLog();

  selectedLogId = Object.keys(logs)[logIdx];
  updateDisplayedLog();
});
