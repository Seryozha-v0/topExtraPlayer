import React from "react";

const Lists = ({ videos }) => {
    console.log(videos);
    return (
        <>
            {videos.map((item, i) => (
                <div key={i}>
                    {item.title}
                </div>
            ))}
        </>
    )
}

export default Lists;