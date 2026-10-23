import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import CdTestimonials from "../components/CdTestimonials";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function CampusDirector() {
    const whatWeOfferRef = useRef(null);

    const scrollToWhatWeOffer = () => {
        if (whatWeOfferRef.current) {
            whatWeOfferRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleGoogleLogin = async () => {
        // Save active tab in localStorage to use after redirect
        // localStorage.setItem("activeTab", activeTab);

        // Redirect to Google login
        // await signIn("google", { callbackUrl: "/grow-your-resume/post-login" });
        localStorage.setItem("activeTab", "ambassador");
        console.log("submitting...");
        await signIn("google", {
            callbackUrl: `/grow-your-resume/post-login`,
        });
    };

    return (
        <>
            <Head>
                <title>Campus Ambassador's Program</title>

                <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
                <meta name="robots" content="index, follow" />
                <meta name={"description"} content={"Campus Ambassador's Program"} />
                <meta property="og:title" content="Campus Ambassador's Program" />
                <meta
                    property="og:description"
                    content="Become the Student Lead of enhancing and expanding the
                entrepreneurial opportunities in your college!"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.ecelliitbhu.com/cd" />
                <meta httpEquiv="Content-Language" content="en-us" />
                <meta charSet="UTF-8" />
            </Head>
            <Nav />
            <div>
                <Container fluid className="body">
                    <Row className="header" style={{ margin: "80px auto" }}>
                        <Col className="info cd-info">
                            <h1>Join the Campus Ambassador's Program!</h1>
                            <h2>
                                Accelerate the entrepreneurial <br /> journey in your college!
                            </h2>
                            <p>Become the Student Lead of enhancing and expanding the entrepreneurial opportunities in your college!</p>

                            <div className="cd-coming-soon-container">
                                <h6 className="cd-coming-soon-heading">COMING SOON !!</h6>
                                <p className="cd-coming-soon-description">
                                    Applications for the Campus Ambassador&apos;s Program will open soon. Get ready to lead the entrepreneurial revolution in your college!
                                </p>
                            </div>
                        </Col>
                        <Col className="image-section">
                            <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_djmhnml5.json" speed="1" loop autoplay></lottie-player>
                        </Col>
                        <div id="who-are-we"></div>
                    </Row>
                    <Row className="who-are-we">
                        <Col className="info waw">
                            <h1 className="mb-2">Why Campus Ambassador's Program?</h1>
                            <p>
                                Devoted to acting as a symbiotic link between the entrepreneurs and the existing startup ecosystem, E-Cell IIT BHU provides you with an opportunity to lead and educate
                                the students masses in your college with various startup related activities and events to inculcate the entrepreneurial culture in your own college!
                            </p>
                            <Button
                                className="learn-more mt-2 join-cd"
                                // href="/cd/#what-we-offer"
                                onClick={scrollToWhatWeOffer}
                               
                            >
                                Learn more &rarr;
                            </Button>
                            <Row className="reach">
                                <Col>
                                    <h3 className="reach-num" id="count1">
                                        1700+
                                    </h3>
                                    <p className="reach-info">{`Enthusiastic Campus Ambassador's Onboarded`}</p>
                                </Col>
                                <Col>
                                    <h3 className="reach-num" id="count2">
                                        250+
                                    </h3>
                                    <p className="reach-info">Colleges supported till date!</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="image-section" style={{ padding: "40px" }}>
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_lnn3liuj.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row id="what-we-offer" ref={whatWeOfferRef} className="what-we-do info" style={{ margin: "60px auto 0px" }}>
                        <h1>What we offer?</h1>
                        <p>
                            {`Through our vision of "Learn, Build and Scale" we implement
              various initiatives and events in IIT BHU to foster the
              entrepreneurial minds and create a culture of enthralling startups
              bound for success!`}
                        </p>
                        <div className="perks-container">
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/1.png" alt="" height="512" width="512" unoptimized />
                                </div>

                                <p>Free E-Summit 2027 Passes</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/2.png" alt="" height="512" width="512" unoptimized />
                                </div>

                                <p>Network with Unicorn Founders and gain valuable experience.</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/3.png" alt="" height="512" width="512" unoptimized />
                                </div>

                                <p>One-to-one mentorship by startup founders</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/4.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>Top performers will be featured on the social media handles of E-Cell IIT BHU.</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/5.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>Access to the Entrepreneurship Masterclass</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/8.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>Opportunity to enter BWU Cohort and start your entrepreneurship journey</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/7.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>Access to Curated Startup Helpbook of E-Cell IIT BHU</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/6.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>{`Top Campus Ambassadors to be featured in the E-Cell IIT BHU's Weekly Newsletter`}</p>
                            </div>
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/9.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>Certificate of Internship verified by E-Cell IIT BHU</p>
                            </div>
                            {/*<div className="perk">*/}
                            {/*  <div className="perk-image">*/}
                            {/*    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/10.png" alt="" height="512" width="512" unoptimized/>*/}
                            {/*  </div>*/}
                            {/*  <p>Free E-Summit 2024 Merch to the (Top 5 Performers)</p>*/}
                            {/*</div>*/}
                            <div className="perk">
                                <div className="perk-image">
                                    <Image src="https://ik.imagekit.io/ecelliitbhu/website/perks/10.png" alt="" height="512" width="512" unoptimized />
                                </div>
                                <p>Goodies, merchandise and learning resources from our sponsors</p>
                            </div>
                        </div>
                    </Row>
                    <Row className="who-are-we" style={{ margin: "auto" }}>
                        <Col className="image-section">
                            <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_9qt5pr9g.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        </Col>
                        <Col className="info waw">
                            <h1 style={{ fontSize: "3rem", margin: "30px 0px" }}>Responsibilities</h1>
                            <ul className="ca-responsibilities">
                                <li>
                                    <DoneRoundedIcon className="resp-icon" />
                                    The Campus Ambassador must assist the students with their total capacity in registering for E-Cell IIT BHU&apos;s competitions.
                                </li>
                                <li>
                                    <DoneRoundedIcon className="resp-icon" />
                                    The Campus Ambassador must increase the outreach of the initiatives of the E-Cell IIT BHU to promote entrepreneurial activities in his/her college network.
                                </li>
                                <li>
                                    <DoneRoundedIcon className="resp-icon" />
                                    The Campus Ambassador may coordinate with the college authorities to extensively circulate the message regarding the conduction of E-Cell IIT BHU events and
                                    initatives.
                                </li>
                                <li>
                                    <DoneRoundedIcon className="resp-icon" />
                                    The Campus Ambassador must Ideate by engaging in discussions with the other Campus Interns and E-cell coordinators to bring new ideas and increase overall reach of
                                    E-Cell IIT BHU
                                </li>
                                <li>
                                    <DoneRoundedIcon className="resp-icon" />
                                    The Campus Ambassador may organize events/sessions promoting entrepreneurship in their respective colleges with the support of E-Cell IIT BHU.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="collage-container" style={{ margin: "70px 0px" }}>
                        <h1>{`Testimonials from previous Campus Ambassadors`}</h1>
                        <CdTestimonials />
                    </Row>
                    <Row className="collage-container" style={{ margin: "70px 0px" }}>
                        <h1>Stay Tuned for the Next Edition!</h1>

                        <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "25px auto" }}>
                            <div className="cd-coming-soon-pill-bottom">
                                <span className="cd-pulse-dot" />
                                <span>Coming Soon • Applications Opening Soon</span>
                            </div>
                        </div>
                    </Row>
                    <Footer />
                </Container>
            </div>
            <script async src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <script async src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
            <script async src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

            <style jsx>{`
                .cd-coming-soon-container {
                    margin-top: 32px;
                    padding: 28px 36px;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 242, 0.95) 100%);
                    border: 2px solid rgba(245, 106, 56, 0.35);
                    border-radius: 20px;
                    box-shadow: 0 12px 36px -4px rgba(245, 106, 56, 0.18), 0 4px 16px rgba(0, 0, 0, 0.04);
                    max-width: 560px;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .cd-coming-soon-container::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #f56a38 0%, #fb923c 50%, #f56a38 100%);
                    background-size: 200% 100%;
                    animation: gradientSlide 3s linear infinite;
                }

                .cd-coming-soon-container:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 18px 42px -4px rgba(245, 106, 56, 0.25), 0 6px 20px rgba(0, 0, 0, 0.06);
                }

                .cd-coming-soon-badge-top {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(245, 106, 56, 0.1);
                    border: 1px solid rgba(245, 106, 56, 0.3);
                    padding: 4px 14px;
                    border-radius: 9999px;
                    margin-bottom: 12px;
                }

                .cd-pulse-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #f56a38;
                    box-shadow: 0 0 0 0 rgba(245, 106, 56, 0.7);
                    animation: pulseGlow 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }

                .cd-badge-text {
                    font-size: 0.82rem;
                    font-weight: 700;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    color: #d94e1e;
                }

                .cd-coming-soon-heading {
                    font-size: 2.2rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    margin: 4px 0 10px 0;
                    background: linear-gradient(135deg, #e0531c 0%, #f56a38 50%, #f97316 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1.15;
                }

                .cd-coming-soon-description {
                    font-size: 1.05rem;
                    color: #4b5563;
                    line-height: 1.55;
                    margin: 0;
                    font-weight: 500;
                }

                .cd-coming-soon-pill-bottom {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 32px;
                    border-radius: 9999px;
                    background: linear-gradient(135deg, rgba(245, 106, 56, 0.1) 0%, rgba(251, 146, 60, 0.15) 100%);
                    border: 2px solid rgba(245, 106, 56, 0.4);
                    color: #e0531c;
                    font-size: 1.15rem;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 20px rgba(245, 106, 56, 0.15);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }

                .cd-coming-soon-pill-bottom:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(245, 106, 56, 0.25);
                }

                @keyframes pulseGlow {
                    0% {
                        box-shadow: 0 0 0 0 rgba(245, 106, 56, 0.7);
                        transform: scale(0.95);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(245, 106, 56, 0);
                        transform: scale(1.15);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(245, 106, 56, 0);
                        transform: scale(0.95);
                    }
                }

                @keyframes gradientSlide {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 200% 50%;
                    }
                }

                @media (max-width: 768px) {
                    .cd-coming-soon-container {
                        padding: 20px 22px;
                        margin-top: 24px;
                    }
                    .cd-coming-soon-heading {
                        font-size: 1.75rem;
                    }
                    .cd-coming-soon-description {
                        font-size: 0.95rem;
                    }
                    .cd-coming-soon-pill-bottom {
                        font-size: 0.95rem;
                        padding: 12px 20px;
                        text-align: center;
                    }
                }
            `}</style>
        </>
    );
}
