import subprocess, pathlib
base=pathlib.Path(r"C:/Users/coled/Videos/Tebra walkthrough")
source=r"C:/Users/coled/Videos/2026-11-02 13-07-45.mp4"
# Four-second opener, all source footage, eight-second summary. No narration cuts.
vf=("[0:v]scale=3828:2148:flags=lanczos,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.3,setpts=PTS-STARTPTS[v0];"
"[1:v]fps=30,setsar=1,setpts=PTS-STARTPTS[v1];"
"[2:v]scale=3828:2148:flags=lanczos,setsar=1,format=yuv420p,fade=t=out:st=7.5:d=0.5,setpts=PTS-STARTPTS[v2];"
"[v0][v1][v2]concat=n=3:v=1:a=0[v];"
"[3:a]atrim=duration=349.55,asetpts=PTS-STARTPTS,adelay=4000:all=1,apad=whole_dur=361.55[a]")
cmd=["ffmpeg","-hide_banner","-nostats","-n","-loop","1","-framerate","30","-t","4","-i",str(base/"01-title.png"),"-i",source,
"-loop","1","-framerate","30","-t","8","-i",str(base/"02-summary.png"),"-i",str(base/"cleaned-audio.flac"),
"-filter_complex",vf,"-map","[v]","-map","[a]","-t","361.55","-c:v","libx264","-preset","veryfast","-crf","18",
"-pix_fmt","yuv420p","-r","30","-c:a","aac","-b:a","192k","-ar","48000","-movflags","+faststart",
"-metadata","title=Tebra — Your first design-system rebuild","-progress",str(base/"encode-progress.txt"),str(base/"Tebra-walkthrough-finished.mp4")]
with open(base/"encode-log.txt","w") as log:
    subprocess.run(cmd,stderr=log,check=True)
print(str(base/"Tebra-walkthrough-finished.mp4"))

