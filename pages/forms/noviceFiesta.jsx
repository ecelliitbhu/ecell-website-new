import React from "react";
import Head from "next/head"
import { firebaseDB } from "../../lib/firebase";
import { ref, push } from "firebase/database";
import { useState } from "react";
const form = () => {
    const [teamname, setTeamname] = useState("")
    const [email, setEmail] = useState("")
    const [tleadname, setTleadname] = useState("")
    const [tleadnumber, setTleadnumber] = useState("")
    const [tleademail, setTleademail] = useState("")
    const [tleadbranch, setTleadbranch] = useState("")
    const [tmember1name, setTmember1name] = useState("")
    const [tmember1email, setTmember1email] = useState("")
    const [tmember1number, setTmember1number] = useState("")
    const [tmember1branch, setTmember1branch] = useState("")
    const handleOnClick = (e) => {
        e.preventDefault();
        const db = firebaseDB;
        push(ref(db, "noviceFiesta/"), {
            a_teamname: teamname,
            b_email: email,
            d_tleadname: tleadname,
            c_tleadnumber: tleadnumber,
            e_tleademail: tleademail,
            f_tleadbranch: tleadbranch,
            g_tmember1name: tmember1name,
            h_tmember1email: tmember1email,
            i_tmember1branch: tmember1branch,
            j_tmember1number: tmember1number
        })
            .then(() => {
                alert("Form submitted successfully");
                setTeamname("");
                setEmail("")
                setTleadname("")
                setTleadbranch("")
                setTleademail("")
                setTleadnumber("")
                setTmember1name("")
                setTmember1email("")
                setTmember1number("")
                setTmember1branch("")
            })
            .catch((error) => alert(error.message));
    }
    return (
        <>
            <Head>
                <title>Novice Fiesta</title>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div className='novice'>
                <h2>Novice Fiesta</h2>
                <h4>Let's see, what Novice Fiesta 2022 is all about?</h4>
                <span>Are you exhausted from writing your lengthy mid-sem assignments? Come explore the enthralling world of entrepreneurship with Novice Fiesta.</span>
                <span>E-Cell IIT BHU brings to you 3 fun and exciting events, 3 insightful talks with successful startup founders, and 3 days filled with fun and interesting prizes.</span>

                <span> An exhilarating Freshers&apos; only weekend to hone your entrepreneurial skills.</span>

                <ul>We&apos;re here with the details of the most awaited weekend for freshers! 🥳</ul>

                <li>Quiz-It: Test your knowledge and analytical skills to deep-dive into the world of entrepreneurship</li>
                <li>Link-It: Find the hidden treasure by tracing clues and racing against time</li>
                <li>Build-It: Fascinated by the startup world, here’s your chance to build your team and bring out your ideas</li>
            </div>
            <div className='noviceitem'>
                <form className='cf' onSubmit={handleOnClick}>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="title">Email<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={email} type="text" className='form-input' id="Email" name="Email" aria-describedby="emailHelp" placeholder="xyz@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="teamname" className="">Team Name<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={teamname} type="text" className='form-input' id="teamname" name="teamname" placeholder="Proxy" required onChange={(e) => setTeamname(e.target.value)} />
                    </div>
                    <div className="novicename">Team Leader's Details</div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tleadname" className="">Name<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tleadname} type="text" className='form-input' id="tleadname" name="tleadname" placeholder="Name" required onChange={(e) => setTleadname(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tleademail" className="">Institute E-mail Id<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tleademail} type="text" className='form-input' id="tleademail" name="tleademail" placeholder="name.branch.year.@itbhu.ac.in" required onChange={(e) => setTleademail(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tleadnumber" className="">Phone Number (WhatsApp No.)<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tleadnumber} type="text" className='form-input' id="tleadnumber" name="tleadnumber" placeholder="8996644558" required onChange={(e) => setTleadnumber(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tleadbranch" className=""> Branch (B Tech/B Arch/IDD/PG) and Year{" "}<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tleadbranch} type="text" className='form-input' id="tleadbranch" name="tleadbranch" placeholder="Mechanical Engineering BTech 1st Year" required onChange={(e) => setTleadbranch(e.target.value)} />
                    </div>
                    <div className="novicename">Team Member 1</div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tmember1name" className="">Name<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tmember1name} type="text" className='form-input' id="tmember1name" name="tmember1name" placeholder="Name" required onChange={(e) => setTmember1name(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tmember1email" className="">Institute E-mail Id<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tmember1email} type="text" className='form-input' id="tmember1email" name="tmember1email" placeholder="name.branch.year.@itbhu.ac.in" required onChange={(e) => setTmember1email(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tmember1number" className="">Phone Number (WhatsApp No.)<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tmember1number} type="text" className='form-input' id="tmember1number" name="tmember1number" placeholder="8994455668" required onChange={(e) => setTmember1number(e.target.value)} />
                    </div>
                    <div className='noviceitem'>
                        <label><h5 htmlFor="tmember1branch" className="">Branch (B Tech/B Arch/IDD/PG) and Year{" "}<span style={{ color: "red" }}>*</span></h5></label>
                        <input value={tmember1branch} type="text" className='form-input' id="tmember1branch" name="tmember1branch" placeholder="Mechanical Engineering BTech 1st Year" required onChange={(e) => setTmember1branch(e.target.value)} />
                    </div>
                    <input type="submit" value="Submit" id="input-submit" />
                </form>
            </div>
        </>
    )
}

export default form