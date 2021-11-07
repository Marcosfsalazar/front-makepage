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
import {Box} from "@chakra-ui/react";

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

const Icons = ({className, logosClass, logos, color}) => {
    return (
        <Box className={className}>
            { logos &&
                logos.map((logo, index) => {
                    const ComponentName = Map[logo.name];
                    return <a key={`${logo.link}${index}`}  href={logo.link} className={logosClass}><ComponentName{...logo} color={color} size="28"/></a>
                })
            }
        </Box>
    )
}

export default Icons;
