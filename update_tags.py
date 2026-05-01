import re

html_file = 'index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    text = f.read()

# I will replace the <div class="project-tech">...</div> blocks dynamically.
# Projects are precisely ordered 1 to 14.
tags_data = [
    ["Python", "LLM", "Gradio"],
    ["React Native", "Firebase", "Productivity"],
    ["React Native", "Board Games", "Offline Mode"],
    ["React Native", "3D Viewer", "Science"],
    ["React Native", "AI Styling", "Firebase"],
    ["AI/ML", "Hardware", "Sensors"],
    ["Computer Vision", "AI/ML", "Mapping"],
    ["Machine Learning", "Vision", "UAV"],
    ["YOLO v8", "Autonomous", "Drone"],
    ["Hardware", "Renewable Energy", "IoT"],
    ["Hardware", "Autonomous Flight", "UAV Design"],
    ["Computer Vision", "Map API", "ECU Control"],
    ["Computer Vision", "Sensors", "Automotive"],
    ["Hardware", "IoT", "Biomedical"]
]

# Find all blocks of class="project-tech" and replace their inner span contents
pattern = r'<div class="project-tech">(.*?)</div>'
blocks = re.findall(pattern, text, flags=re.DOTALL)

if len(blocks) == 14:
    for i, block in enumerate(blocks):
        spans = ''.join([f'<span>{t}</span>' for t in tags_data[i]])
        replacement = f'\\n            {spans}\\n          '
        # Be careful replacing the match directly.
        # It's safer to use a function in re.sub
        
def replacer(match):
    replacer.counter += 1
    idx = replacer.counter - 1
    if idx < 14:
        spans = ''.join([f'<span>{t}</span>' for t in tags_data[idx]])
        return f'<div class="project-tech">\\n            {spans}\\n          </div>'
    return match.group(0)

replacer.counter = 0

new_text = re.sub(pattern, replacer, text, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Updated tags successfully.")
