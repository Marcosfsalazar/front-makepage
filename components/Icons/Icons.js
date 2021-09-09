import {
    IoLogoFacebook,
    IoLogoGithub,
    IoLogoMedium,
    IoLogoTwitter,
    IoLogoPinterest,
    IoLogoInstagram,
    IoLogoSnapchat,
    IoLogoYoutube,
    IoLogoTumblr,
    IoLogoTwitch,
    IoLogoTiktok,
} from "react-icons/io5";

const Map = {
    "github": IoLogoGithub,
    "medium": IoLogoMedium,
    "facebook": IoLogoFacebook,
    "twitter": IoLogoTwitter,
    "pinterest": IoLogoPinterest,
    "instagram": IoLogoInstagram,
    "snapchat": IoLogoSnapchat,
    "youtube": IoLogoYoutube,
    "tumblr": IoLogoTumblr,
    "twitch": IoLogoTwitch,
    "tiktok": IoLogoTiktok,
}

const Icons = ({className, logosClass, logos}) => {
    return (
        <div className={className}>
            { logos &&
                logos.map(logo => {
                    const ComponentName = Map[logo.name];
                    return <a key={logo.link}  href={logo.link} className={logosClass}><ComponentName{...logo} color="white" size="28"/></a>
                })
            }
        </div>
    )
}

export default Icons;
