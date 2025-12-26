import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages, channelName, channelTopic } = await request.json()

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 })
    }

    const userQuery = lastMessage.content.toLowerCase()
    const response = generateChatResponse(userQuery, channelName, channelTopic, messages)

    return NextResponse.json({ message: response })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process chat: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

function generateChatResponse(query: string, channelName: string, channelTopic: string, messages: Message[]): string {
  const channel = channelName || 'your channel'
  const topic = channelTopic || 'your niche'

  // Video ideas
  if (query.includes('video idea') || query.includes('what should i make') || query.includes('content idea')) {
    return `Here are some video ideas for ${channel}:

1. **Tutorial Series**: Break down complex ${topic} concepts into bite-sized tutorials
2. **Weekly Updates**: Cover the latest news and trends in ${topic}
3. **Challenge Videos**: "I tried [something related to ${topic}] for 7 days"
4. **FAQ**: Answer common questions from your audience
5. **Collaboration**: Partner with other creators in the ${topic} space

Which type interests you most? I can help you develop it further!`
  }

  // Growth/analytics
  if (query.includes('grow') || query.includes('subscriber') || query.includes('view') || query.includes('analytics')) {
    return `Here's how to grow ${channel}:

📈 **Quick Wins:**
• Post consistently (2-3 times per week minimum)
• Optimize first 30 seconds (hook viewers immediately)
• Use engaging thumbnails with faces and emotions
• Reply to comments within first hour of posting
• Cross-promote on social media

🎯 **Long-term Strategy:**
• Focus on searchable topics in ${topic}
• Create playlist series to increase watch time
• Analyze your top 5 performing videos and make similar content
• Collaborate with channels in your niche
• Study your YouTube Analytics weekly

What specific aspect of growth would you like to focus on?`
  }

  // SEO/optimization
  if (query.includes('seo') || query.includes('rank') || query.includes('search') || query.includes('optimize')) {
    return `SEO tips for ${channel} in ${topic}:

🔍 **Keyword Research:**
• Use YouTube's autocomplete to find popular searches
• Check "People also search for" in video results
• Analyze competitor titles and tags
• Use tools like TubeBuddy or VidIQ

✍️ **Optimization Checklist:**
• Include main keyword in first 60 characters of title
• Write 200+ word descriptions with keywords
• Use 15-20 relevant tags
• Add timestamps to keep viewers engaged
• Create custom thumbnails (1280x720px)

📊 **Track Performance:**
• Monitor CTR (click-through rate) - aim for 5-10%
• Check average view duration
• Adjust strategy based on data

Need help optimizing a specific video?`
  }

  // Monetization
  if (query.includes('money') || query.includes('monetize') || query.includes('earn') || query.includes('income')) {
    return `Monetization strategies for ${channel}:

💰 **YouTube Partner Program:**
• Requirement: 1,000 subscribers + 4,000 watch hours
• Enable ads once eligible
• Typical earnings: $3-$5 per 1,000 views

💼 **Additional Revenue Streams:**
• **Sponsorships**: Reach out to brands in ${topic}
• **Affiliate Marketing**: Promote products you use
• **Merchandise**: Sell branded items to fans
• **Channel Memberships**: Offer exclusive perks
• **Online Courses**: Teach your expertise
• **Patreon**: Get direct support from fans

🎯 **Priority Strategy:**
Focus on growing to 10K subscribers first, then monetization becomes much easier!

Which revenue stream interests you most?`
  }

  // Equipment/technical
  if (query.includes('equipment') || query.includes('camera') || query.includes('microphone') || query.includes('lighting') || query.includes('editing')) {
    return `Equipment and technical setup for ${channel}:

🎥 **Budget Setup ($200-500):**
• Camera: Smartphone or Logitech C920 webcam
• Microphone: Blue Yeti or Audio-Technica AT2020
• Lighting: 2x ring lights or softbox kit
• Editing: DaVinci Resolve (free) or iMovie

💎 **Intermediate Setup ($500-1500):**
• Camera: Sony ZV-1 or Canon M50
• Microphone: Rode VideoMic Pro+
• Lighting: Godox SL-60W LED panels
• Editing: Adobe Premiere Pro or Final Cut Pro

🎬 **Editing Tips:**
• Cut out dead air and filler words
• Add background music (use royalty-free)
• Use jump cuts to maintain pace
• Include text overlays for key points
• Color grade for professional look

The quality of your content matters more than expensive gear. Start with what you have!

What specific technical aspect do you need help with?`
  }

  // Posting schedule
  if (query.includes('when') || query.includes('schedule') || query.includes('post') || query.includes('upload')) {
    return `Posting schedule strategy for ${channel}:

⏰ **Best Times to Upload:**
• Weekdays: 2-4 PM (when people finish work/school)
• Weekends: 9-11 AM
• Test different times and check your Analytics

📅 **Frequency:**
• Minimum: 1 video per week
• Ideal: 2-3 videos per week
• Quality > Quantity always!

🎯 **Consistency Tips:**
• Batch create content (film 3-4 videos in one day)
• Schedule uploads in advance
• Have 2-3 videos ready as buffer
• Tell your audience when to expect new content

For ${topic} content, I'd recommend posting Tuesdays and Fridays at 3 PM.

Would you like help planning a content calendar?`
  }

  // Thumbnails
  if (query.includes('thumbnail') || query.includes('design') || query.includes('clickable')) {
    return `Thumbnail tips for ${channel}:

🎨 **Design Rules:**
• Face takes up 40% of thumbnail (if showing face)
• Use 3-4 contrasting colors max
• Bold, readable text (even on mobile)
• High contrast and bright colors
• Emotion in facial expression

✅ **What Works:**
• Before/After comparisons
• Shocked/excited facial expressions
• Question-based thumbnails
• Numbers and lists (e.g., "5 TIPS")
• Arrows pointing to subject

❌ **Avoid:**
• Cluttered designs
• Small text
• Misleading images (clickbait)
• Too many colors
• Low contrast

🛠️ **Tools:**
• Canva (easiest, has templates)
• Photoshop (professional)
• Photopea (free online alternative)

Want me to suggest specific thumbnail concepts for your next video?`
  }

  // Engagement/community
  if (query.includes('engage') || query.includes('community') || query.includes('comment') || query.includes('audience')) {
    return `Building engagement for ${channel}:

💬 **Boost Comments:**
• Ask questions in your video
• Pin a discussion question in comments
• Reply to comments within first hour
• Create polls in Community tab
• Host Q&A videos

👥 **Community Building:**
• Give viewers a name (e.g., "Hey [Name] fam!")
• Share behind-the-scenes content
• Respond to DMs and messages
• Feature fan content/comments in videos
• Go live occasionally to interact in real-time

🎯 **Call-to-Actions:**
• "Let me know in comments if you want part 2"
• "What should I cover next?"
• "Share your experience with ${topic}"
• "Tag someone who needs to see this"

Active community = better algorithm performance!

What aspect of community building would you like to focus on?`
  }

  // Script/content structure
  if (query.includes('script') || query.includes('structure') || query.includes('write') || query.includes('outline')) {
    return `Video script structure for ${channel}:

📝 **Proven Formula:**

**HOOK (0-15 sec):**
"What if I told you..." or "In this video, I'll show you..."
Create curiosity immediately!

**INTRO (15-45 sec):**
• Brief introduction
• What they'll learn
• Quick CTA to subscribe

**MAIN CONTENT (70% of video):**
• Break into 3-5 clear sections
• Use transitions: "Now...", "Next...", "Here's the thing..."
• Include examples and stories
• Show, don't just tell

**ENGAGEMENT POINTS:**
• Ask question mid-video
• Pattern interrupts (zoom, cut, sound effect)
• Preview what's coming next

**CONCLUSION (last 10%):**
• Recap key points
• Clear call-to-action
• Tease next video

**END SCREEN:**
• Point to other videos
• Subscribe reminder

For ${topic} videos, aim for 8-12 minutes for optimal watch time!

Want me to write a full script for a specific topic?`
  }

  // General help or unclear query
  return `I'm here to help with ${channel}! I can assist you with:

🎬 **Content Creation:**
• Video ideas and brainstorming
• Script writing and structure
• Title and description optimization

📈 **Growth Strategy:**
• SEO and discoverability
• Audience engagement
• Analytics interpretation

💡 **Technical Help:**
• Equipment recommendations
• Editing tips
• Thumbnail design

💰 **Monetization:**
• Revenue strategies
• Sponsorship approaches
• Multiple income streams

${topic ? `Since you're in the ${topic} niche, I can give you specific advice tailored to your content type.` : ''}

What specific challenge are you facing right now?`
}
