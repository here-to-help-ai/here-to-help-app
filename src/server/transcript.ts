import { z } from "zod";

const data = { "transcription_speaker_timestamp": "<Speaker 0> < Time-stamp: 1.12 - 6.18>\n\nHi.I I hope it's okay.I'm calling.I just wanted to talk to someone.\n\n\n<Speaker 1> < Time-stamp: 6.3199997 - 9.985>\n\nYeah.Of course.It's perfectly okay.I'm here to listen.What's been going on?\n\n\n<Speaker 0> < Time-stamp: 10.464999 - 17.525>\n\nWell, well, things have been kind of rough lately.I lost my job a few months ago, and it's been hard to stay positive.\n\n\n<Speaker 1> < Time-stamp: 18.83 - 25.41>\n\nWell, I'm really sorry to hear that losing a job can be really stressful.How have you been coping with everything?\n\n\n<Speaker 0> < Time-stamp: 26.205 - 34.385002>\n\nWell, at first, I thought I could handle it, but now I just feel so overwhelmed.It's affecting my sleep and my mood.\n\n\n<Speaker 1> < Time-stamp: 35.71 - 47.015>\n\nThat sounds tough.Not sleeping well can make everything else feel even more challenging.Have you been able to talk to anyone about how you're feeling?\n\n\n<Speaker 0> < Time-stamp: 48.195 - 55.579998>\n\nNo.I haven't I don't want about it, my friends, my family with, you know, all all my problems.\n\n\n<Speaker 1> < Time-stamp: 56.76 - 66.92>\n\nLook, it's important to have support during tough times.People who care about you would want to help.So how are you feeling about everything right now?\n\n\n<Speaker 0> < Time-stamp: 67.24 - 76.415>\n\nHonestly, I I'm starting to feel like I'm drowning.Nothing I do seems to make a difference and I'm constantly anxious.\n\n\n<Speaker 1> < Time-stamp: 78.155 - 86.009995>\n\nI'm really sorry you're feeling this way.Anxiety can be incredibly difficult to deal with.You considered speaking to a mental health professional?\n\n\n<Speaker 0> < Time-stamp: 86.47 - 94.785>\n\nI have, but I just thought it might make me more anxious.I'm scared they won't understand or be able to help.\n\n\n<Speaker 1> < Time-stamp: 95.885 - 108.979996>\n\nIt's completely normal to feel that way, but, look, therapists are trained to help.With these exact issues, and sometimes talking about what's going on can really help.So are you feeling safe right now?\n\n\n<Speaker 0> < Time-stamp: 110.515 - 118.375>\n\nI don't know.I've been feeling really having really dark thoughts lately.I'm scared of what I might do.\n\n\n<Speaker 1> < Time-stamp: 119.619995 - 127.479996>\n\nLook, I'm I'm really concerned for your safety, and it's important that we get you some immediate help.Do you have any means of harming yourself right now?\n\n\n<Speaker 0> < Time-stamp: 129.66501 - 132.88501>\n\nYes.I do, but I don't wanna think about anything yet.\n\n\n<Speaker 1> < Time-stamp: 135.425 - 146.465>\n\nLook, thanks for telling me.And it's really important that we address this right now.Can we call someone who, like, can be with you or, like, some friends or family\n\n\n<Speaker 0> < Time-stamp: 148.065 - 152.565>\n\nI I guess I could call my friend, but I'd I just don't wanna worry them.\n\n\n<Speaker 1> < Time-stamp: 153.50499 - 165.615>\n\nLook, your your friend would know would want to know, and be there for you.Let's call them together.You know, I'll stay on the line with you until they arrive.And meanwhile, I'll help you find immediate mental health support.\n\n\n<Speaker 0> < Time-stamp: 166.71501 - 170.975>\n\nOkay.Okay.I'll call them now.Thank you.Thank you for staying with me.\n\n\n<Speaker 1> < Time-stamp: 171.115 - 177.61>\n\nOf course.You're doing the right thing reaching out.Let's stay connected until your friends with you, and we'll get the right support together.", "summary_and_quotes": null, "transcription": "Hi. I I hope it's okay. I'm calling. I just wanted to talk to someone. Yeah. Of course. It's perfectly okay. I'm here to listen. What's been going on? Well, well, things have been kind of rough lately. I lost my job a few months ago, and it's been hard to stay positive. Well, I'm really sorry to hear that losing a job can be really stressful. How have you been coping with everything? Well, at first, I thought I could handle it, but now I just feel so overwhelmed. It's affecting my sleep and my mood. That sounds tough. Not sleeping well can make everything else feel even more challenging. Have you been able to talk to anyone about how you're feeling? No. I haven't I don't want about it, my friends, my family with, you know, all all my problems. Look, it's important to have support during tough times. People who care about you would want to help. So how are you feeling about everything right now? Honestly, I I'm starting to feel like I'm drowning. Nothing I do seems to make a difference and I'm constantly anxious. I'm really sorry you're feeling this way. Anxiety can be incredibly difficult to deal with. You considered speaking to a mental health professional? I have, but I just thought it might make me more anxious. I'm scared they won't understand or be able to help. It's completely normal to feel that way, but, look, therapists are trained to help. With these exact issues, and sometimes talking about what's going on can really help. So are you feeling safe right now? I don't know. I've been feeling really having really dark thoughts lately. I'm scared of what I might do. Look, I'm I'm really concerned for your safety, and it's important that we get you some immediate help. Do you have any means of harming yourself right now? Yes. I do, but I don't wanna think about anything yet. Look, thanks for telling me. And it's really important that we address this right now. Can we call someone who, like, can be with you or, like, some friends or family I I guess I could call my friend, but I'd I just don't wanna worry them. Look, your your friend would know would want to know, and be there for you. Let's call them together. You know, I'll stay on the line with you until they arrive. And meanwhile, I'll help you find immediate mental health support. Okay. Okay. I'll call them now. Thank you. Thank you for staying with me. Of course. You're doing the right thing reaching out. Let's stay connected until your friends with you, and we'll get the right support together." };
const schema = z.object({
    transcription_speaker_timestamp: z.string(),
});

export const transcript = schema.parse(data);