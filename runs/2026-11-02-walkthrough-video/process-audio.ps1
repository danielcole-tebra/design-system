$sourceVideo = 'C:/Users/coled/Videos/2026-11-02 13-07-45.mp4'
$outputFolder = 'C:/Users/coled/Videos/Tebra walkthrough'
# Measurement pass. Values below are from this source and filter chain.
ffmpeg -hide_banner -nostats -i $sourceVideo -vn -af 'highpass=f=75,adeclick=t=3,loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json' -f null NUL 2> "$outputFolder/audio-analysis.txt"
ffmpeg -hide_banner -nostats -n -i $sourceVideo -vn -af 'highpass=f=75,adeclick=t=3,loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=-26.26:measured_TP=-0.09:measured_LRA=9.40:measured_thresh=-37.23:offset=1.60:linear=false:print_format=json' -ar 48000 -c:a flac "$outputFolder/cleaned-audio.flac" 2> "$outputFolder/audio-process.txt"
