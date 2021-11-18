var args;
var gforms;
var gvars;
var useform;

var WordList;

var GenCount = 10

args = WScript.Arguments.Unnamed;
if (args.count < 1)
	WScript.quit();

    var fso;
    var ts;
    var curline;
    var forreading = 1;
    var forwriting = 2;
    fso = WScript.CreateObject("Scripting.FileSystemObject");
    ts = fso.opentextfile(args(0), forreading, true);
    gforms = ReadForms (ts);
    gvars = ReadVars (ts);

WordList = "";
for (var ct = 1; ct <= GenCount; ct++)
    WordList = WordList.concat (GenWord(gforms[Math.floor(Math.random() * gforms.length)], gvars), '\n');

var WshShell = WScript.CreateObject("WScript.Shell");
WshShell.Run("notepad");
WScript.Sleep(100);
WshShell.AppActivate("Notepad");
WScript.Sleep(100);
WshShell.SendKeys (WordList);

function GenWord (form, vars)
{
    var returnword = "";

    for (counter = 0; counter <= form.length - 1; counter++)
    {
        var x = GetArray (form.charAt(counter), vars);

        if (typeof(x) == "string")
            returnword = returnword.concat (x);
        else
            returnword = returnword.concat (x[Math.floor(Math.random() * x.length)]);
    }
    return returnword;
}

function GetArray (FindVar, vars)
{
    for (var intLooper=0; intLooper < vars.length; intLooper++)
        if (vars[intLooper][0] == FindVar)
            return vars[intLooper][1];
    return FindVar;
}

function ReadForms (file)
{
    curline = file.readline ();
    return curline.split (",");
}

function ReadVars (file)
{
    var vars;
    vars = new Array();
    do
    {
        curline = ts.readline ();
        curline = curline.split ("=");

        vars[vars.length] = new Array();
        vars[vars.length - 1][0] = curline[0];
        vars[vars.length - 1][1] = curline[1].split (",");
    } while (!ts.AtEndOfStream)

    return vars;
}
