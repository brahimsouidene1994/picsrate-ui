import React from "react"

type imgProps={
    src: string | undefined
    alt: string
}
export default function Img({src, alt}:imgProps){
    const [imgLoaded, setImgLoaded] = React.useState(false)
    const imagesRef = React.useRef<Object>({});
    React.useEffect(() => {
        if (src && !(src! in imagesRef.current)) {
            const img = new Image();
            img.src = src;
            img.onload = () => setImgLoaded(true);
            (imagesRef.current as any).src = img;
          }
    },[src])
    return(
        <>
            <img
            style={{ borderTopRightRadius: '10px', borderTopLeftRadius: '10px',width:'100%',height:'85%',opacity: imgLoaded? 1 : 0.5, objectFit:"cover" }}
            srcSet={`${src}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${src}?w=248&fit=crop&auto=format`}
            alt={alt}
            ref={(el) => ((imagesRef.current as any).src = el)}
            loading="lazy"
            />
        </>
    )
}