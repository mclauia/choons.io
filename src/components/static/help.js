import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Help() {
    return <Row className="pad-bottom">
        <Col xs={12} md={12}>
            <h1>What the Heck is This? <small>and what's a choon?</small></h1>
            <p>A choon's a tune!</p>
            <p>Choons.io isn't a database of all choons ever.</p>
            <p>It's <strong>your</strong> database of the choons <strong>you</strong> know, or want to know, or are practicing.</p>
            <p>It's basically a personal choon archiving app where the really important metadata applies only to you:
            </p>
            <ul>
                <li>where'd <strong>you</strong> first hear it?</li>
                <li>who'd <strong>you</strong> learn it from?</li>
                <li>what choons do <strong>you</strong> like to play with it?</li>
                <li>what sessions could <strong>you</strong> play it in?</li>
                <li>how do <strong>you</strong> start the choon? which version do <strong>you</strong> play?</li>
            </ul>

            <h2>Adding Choons</h2>
            <p>You can manually add a choon with as much or as little info as you want. You can always edit it later.</p>
            <p>You can also import choons from someone's public list; more on that below.</p>
            <p>When a choon has been added to your list recently, a full moon (<span role="img" aria-label="Practiced recently">🌕 </span>) will appear next to it for a month.</p>

            <h2>Tracking Your Choons</h2>
            <p>This grew out of a desire to keep track of which choons out of the thousands out there <strong>I</strong> wanted to learn, or knew, and which ones I was practicing.</p>
            <p>Tracking has two main parts:</p>

            <h3>Choon Stages</h3>
            <p>This is a high level summary of where you're at with the choon, whether it's on your "to learn" list, or something that needs to be brushed up on, or polished, or ready to perform.</p>
            <p>When a choon has been learnt recently, a "new driver" (<span role="img" aria-label="Practiced recently">🔰 </span>) will appear next to it for a month.</p>
            <p>When a choon hasn't been learned a month after it was added, a dark moon (<span role="img" aria-label="Practiced recently">🌑 </span>) will appear next to it.</p>

            <h3>Practicing Choons</h3>
            <p>There's a practice timer on the View page. <strong>Spacebar</strong> or clicking "git practicing" will start and stop a timer, which saves how much you've practiced total and when your last practice was (it does not save individual practice sessions). Or, you can enter a number of minutes practiced and click "add time"</p>
            <p>You can use this as exactly or loosely as you want; it's most useful for visualizing choons that have gone unloved for a long period of time.</p>
            <p>Practicing a choon and "learning" it are different, and you can use the "learnt it" button to end your practice if you feel like you've figured out all the notes you want to.</p>
            <p>When a choon has been practiced recently, a fiddle (<span role="img" aria-label="Practiced recently">🎻 </span>) will appear next to it for a week.</p>
            <p>When a choon hasn't been practiced recently, cobwebs (<span role="img" aria-label="Practiced recently">🕸 </span>) will appear next to it for every week out of practice.</p>

            <h2>Sharing Your Choons</h2>
            <p>Your Choons will be private by default.</p>

            <p>But! If you want, you can make your list public, and send friends the unlisted URL to your full Choons list.</p>
            <p>Your friends will be able to see everything: what you've learned and when, what you're practicing, what you've added to learn, and your notes. So don't write anything private in there.</p>
            <p>Click the "Go Public" button to set your list to public. Once it's public, you can copy your public URL to paste into a message to friends.</p>
            <p>Click the "Go Private" button to make your public list private at any time, instantly, no matter who has the URL.</p>

            <h3>Importing Choons from another public list</h3>
            <p>If you're looking at someone else's list, there will be "Import" buttons on the List and View pages. Click one of these and the choon will be copied to your list, minus their personal metadata (practice info, learning stage, notes).</p>
            <p>You can't edit someone else's choons, so after importing you're editing your own personal version of the choon. Maybe you play it in a different key? Maybe you lump it in with Irish choons, not Scottish? Maybe you know it by a different name?</p>

            <h2>Future Features</h2>
            <p>There are some features I want to add down the road.</p>
            <ul>
                <li>set lists for arranged medleys</li>
                <li>linking choons between users to see what you have in common (choon aliases could then be auto-generated)</li>
                <li>integrating recordings or playback</li>
            </ul>
            <p>If you have any other ideas, please lemme know!</p>
        </Col>
    </Row>
}