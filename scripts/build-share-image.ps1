Add-Type -AssemblyName System.Drawing
$taskRoot = Split-Path $PSScriptRoot -Parent
$taskImage = New-Object System.Drawing.Bitmap(1200,630)
$taskCanvas = [System.Drawing.Graphics]::FromImage($taskImage)
$taskCanvas.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$taskCanvas.Clear([System.Drawing.ColorTranslator]::FromHtml('#07173F'))
$taskGrid = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(30,255,255,255),1)
for ($taskX=0;$taskX -le 1200;$taskX+=60) { $taskCanvas.DrawLine($taskGrid,$taskX,0,$taskX,630) }
for ($taskY=0;$taskY -le 630;$taskY+=60) { $taskCanvas.DrawLine($taskGrid,0,$taskY,1200,$taskY) }
$taskBlue = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#2E96F5'))
$taskYellow = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#EAFE07'),6)
$taskWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$taskCanvas.FillEllipse($taskBlue,825,180,200,200)
$taskCanvas.DrawEllipse($taskYellow,770,220,310,100)
$taskTitle = New-Object System.Drawing.Font('Segoe UI',56,[System.Drawing.FontStyle]::Bold)
$taskLabel = New-Object System.Drawing.Font('Segoe UI',24,[System.Drawing.FontStyle]::Regular)
$taskCanvas.DrawString('SPACE APPS',$taskTitle,$taskWhite,70,170)
$taskCanvas.DrawString('KANDY 2026',$taskTitle,$taskWhite,70,255)
$taskCanvas.DrawString('Explore. Collaborate. Create.',$taskLabel,$taskWhite,76,380)
$taskCanvas.DrawString('GLOBAL EVENT | NOVEMBER 14-15',$taskLabel,$taskWhite,76,520)
$taskImage.Save((Join-Path $taskRoot 'public/og-image.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$taskTitle.Dispose(); $taskLabel.Dispose(); $taskGrid.Dispose(); $taskBlue.Dispose(); $taskYellow.Dispose(); $taskWhite.Dispose(); $taskCanvas.Dispose(); $taskImage.Dispose()
