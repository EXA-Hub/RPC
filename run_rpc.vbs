Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c node ""rpc.js""", 1, True
Set WshShell = Nothing
