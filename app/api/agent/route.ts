import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { channelName, channelTopic, taskType, taskInput } = await request.json()

    let prompt = ''
    const channelInfo = channelName && channelTopic
      ? `for the YouTube channel "${channelName}" which focuses on ${channelTopic}`
      : 'for a YouTube channel'

    switch (taskType) {
      case 'video-ideas':
        prompt = `Generate 5 creative and engaging video ideas ${channelInfo}. ${taskInput ? `Additional context: ${taskInput}` : ''} Make each idea specific, unique, and likely to attract viewers.`
        break
      case 'title':
        prompt = `Create 3 compelling YouTube video titles ${channelInfo}. ${taskInput ? `Video topic: ${taskInput}` : ''} Make them attention-grabbing, SEO-friendly, and under 60 characters.`
        break
      case 'description':
        prompt = `Write a complete YouTube video description ${channelInfo}. ${taskInput ? `Video topic: ${taskInput}` : ''} Include: an engaging intro, timestamps outline, relevant hashtags, and call-to-action.`
        break
      case 'tags':
        prompt = `Suggest 15-20 relevant tags ${channelInfo}. ${taskInput ? `Video topic: ${taskInput}` : ''} Include a mix of broad and specific tags for optimal discoverability.`
        break
      case 'script':
        prompt = `Write a complete video script ${channelInfo}. ${taskInput ? `Video topic: ${taskInput}` : ''} Include: hook (first 15 seconds), main content with clear sections, and strong call-to-action.`
        break
      case 'thumbnail':
        prompt = `Suggest 3 creative thumbnail concepts ${channelInfo}. ${taskInput ? `Video topic: ${taskInput}` : ''} Describe the visual elements, text overlay, colors, and emotions to convey.`
        break
      default:
        prompt = `Help with YouTube content creation ${channelInfo}. ${taskInput}`
    }

    // Simulate AI response with intelligent content generation
    const result = generateResponse(taskType, channelName, channelTopic, taskInput)

    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

function generateResponse(taskType: string, channelName: string, channelTopic: string, taskInput: string): string {
  const topic = channelTopic || 'your niche'
  const channel = channelName || 'Your Channel'

  switch (taskType) {
    case 'video-ideas':
      return `📹 Video Ideas for ${channel}:

1. "The Ultimate ${topic} Guide for Beginners in 2024"
   - Comprehensive overview perfect for newcomers

2. "${topic}: 5 Mistakes Everyone Makes (And How to Avoid Them)"
   - Common pitfalls with practical solutions

3. "I Tried ${topic} for 30 Days - Here's What Happened"
   - Personal journey format with transformation story

4. "${topic} vs [Alternative]: Which is Actually Better?"
   - Comparison content with data-driven insights

5. "The Secret to ${topic} That Nobody Talks About"
   - Unique perspective on overlooked aspects

${taskInput ? `\n💡 Based on your input: "${taskInput}"\nConsider adding personal stories and behind-the-scenes content to make these more relatable!` : ''}`

    case 'title':
      return `🎯 Compelling Titles for ${channel}:

1. "This ${topic} Trick Changed Everything (You Need to Try It)"
2. "${topic} in 2024: What They Don't Tell You"
3. "I Spent $1000 on ${topic} - Was It Worth It?"

✨ Pro tips:
- Use numbers and brackets for higher CTR
- Create curiosity without clickbait
- Include keywords early in the title`

    case 'description':
      return `📝 Video Description for ${channel}:

${taskInput || `Master ${topic} with this comprehensive guide!`}

In this video, we dive deep into everything you need to know about ${topic}. Whether you're a beginner or looking to level up your skills, this video has something for everyone!

⏱️ TIMESTAMPS:
0:00 - Introduction
0:45 - Getting Started
3:20 - Main Content
8:15 - Pro Tips & Tricks
11:30 - Common Mistakes to Avoid
14:00 - Conclusion & Next Steps

🔗 RESOURCES:
[Add your links here]

📱 CONNECT WITH ME:
Instagram: @${channelName?.toLowerCase().replace(/\s+/g, '') || 'yourchannel'}
Twitter: @${channelName?.toLowerCase().replace(/\s+/g, '') || 'yourchannel'}

💬 Let me know in the comments what you'd like to see next!

🔔 Don't forget to SUBSCRIBE and hit the notification bell so you never miss an upload!

#${topic.replace(/\s+/g, '')} #YouTube #ContentCreator #Tutorial`

    case 'tags':
      return `🏷️ Recommended Tags for ${channel}:

Primary Tags (High Priority):
• ${topic}
• ${topic} tutorial
• ${topic} guide
• ${topic} tips
• ${topic} 2024

Secondary Tags:
• how to ${topic}
• ${topic} for beginners
• ${topic} explained
• best ${topic}
• ${topic} review

Long-tail Tags:
• ${topic} step by step
• ${topic} ultimate guide
• learn ${topic}
• ${topic} mistakes
• ${topic} secrets

General Tags:
• tutorial
• howto
• tips and tricks
• educational
• content creator

💡 Use 15-20 tags total, mixing these based on your specific video content!`

    case 'script':
      return `🎬 Video Script for ${channel}:

[HOOK - First 15 Seconds]
"What if I told you that ${taskInput || `everything you know about ${topic} is wrong`}? In the next [X] minutes, I'm going to show you exactly how to ${topic} the right way. Let's dive in!"

[INTRODUCTION - 15-45 Seconds]
"Hey everyone, welcome back to ${channel}! If you're new here, I'm [Your Name] and I help people master ${topic}. Today's video is special because [unique value proposition].

Before we start, make sure to SUBSCRIBE and hit that notification bell - I post new videos every [schedule]."

[MAIN CONTENT - Section 1]
"First, let's talk about [Topic Point 1]...

[Explain with examples, stories, or demonstrations]

[MAIN CONTENT - Section 2]
"Now, here's where it gets interesting. [Topic Point 2]...

[Continue with valuable content]

[MAIN CONTENT - Section 3]
"And finally, the most important thing: [Topic Point 3]...

[Deliver key insights]

[COMMON MISTAKES]
"Before we wrap up, let me quickly share the top 3 mistakes I see people make with ${topic}..."

[CONCLUSION & CTA]
"So there you have it! If you found this helpful, give this video a thumbs up and let me know in the comments what you'd like to see next.

Don't forget to check out [related video/playlist] and I'll see you in the next one!"

[END SCREEN]
[Point to subscription button and other videos]`

    case 'thumbnail':
      return `🖼️ Thumbnail Concepts for ${channel}:

CONCEPT 1: "Before/After Split"
• Left side: "before" state (darker, problem)
• Right side: "after" state (brighter, solution)
• Bold text: "${taskInput || 'GAME CHANGER'}"
• Your face showing excitement on the right side
• Colors: Contrasting (red/blue or orange/purple)

CONCEPT 2: "Dramatic Close-Up"
• Close-up of your face with exaggerated expression (shocked/excited)
• Main subject in background (slightly blurred)
• Large text overlay: "THIS ${topic.toUpperCase()}..."
• Arrow pointing to subject
• High contrast colors with drop shadows

CONCEPT 3: "Visual Comparison"
• Three panels showing progression or comparison
• Numbered circles (1, 2, 3)
• Your face in bottom corner
• Bold headline across top
• Bright background (yellow/blue gradient)

🎨 Design Tips:
• Use 3-4 colors maximum
• Text should be readable on mobile
• 40% of thumbnail = face (if showing face)
• High contrast for visibility
• Test thumbnail at small size before finalizing

📱 Recommended Tools:
• Canva (easiest)
• Photoshop (professional)
• Photopea (free alternative)`

    default:
      return `I'm your YouTube Channel Agent, ready to help with ${topic}!

I can assist you with:
✅ Video ideas and brainstorming
✅ Title and description optimization
✅ Script writing
✅ Tag suggestions
✅ Thumbnail concepts
✅ Content strategy

What would you like help with today?`
  }
}
