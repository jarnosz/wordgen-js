var aVocab;
var args;

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
aVocab = ReadFile (ts);

WordList = "";
for (var ct = 1; ct <= GenCount; ct++)
    WordList = WordList.concat (GenPlot(), '\n');

var WshShell = WScript.CreateObject("WScript.Shell");
WshShell.Run("notepad");
WScript.Sleep(100);
WshShell.AppActivate("Notepad");
WScript.Sleep(100);
WshShell.SendKeys (WordList);

function GenNumber(nRange)
{
    var iNumGen
    iNumGen = Math.round((Math.random() * nRange));
    return iNumGen;
}

function GetFrom(aArray)
{
    var undefined
    var sReturn
    sReturn = aArray[GenNumber(aArray.length)];
    if (sReturn == undefined)
    {
        sReturn = GetFrom(aArray)
    }
    return sReturn
}


function GetArray(sArrayName)
{
    var bHold = true
    for (var intLooper=0;intLooper <aVocab.length;intLooper++)
    {
        if (aVocab[intLooper][0]==sArrayName)
        {
            return aVocab[intLooper][1];
            break;
            bHold = false;
        }
    }

    if (bHold==true)
    {
        alert(sArrayName);
    }
}

function ScanLine(sLine)
{
    var iTagStart, iTagEnd
    var sKey

    if (sLine.indexOf("<") > -1)
    {
        iTagStart = sLine.indexOf("<");
        iTagEnd = sLine.indexOf(">");
            
        sKey = sLine.substr(iTagStart+1, iTagEnd-(iTagStart+1));

        sKey = GetFrom(GetArray(sKey))
        sLine = sLine.substr(0, iTagStart) + sKey + sLine.substr(iTagEnd+1, (sLine.length - iTagEnd))

    }
        

    if (sLine.indexOf("<") > - 1)
    {
        sLine = ScanLine(sLine)
    }

    return sLine;
}


function GenPlot()
{
    sLine = GetFrom(GetArray("BASE"));
    sLine = ScanLine(sLine)
    return sLine;
}


function ReadFile (file)
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
