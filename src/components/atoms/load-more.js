import React from "react"

const loadMore = {
    en: 'LOAD MORE'
}

export const LoadMore = ({
    onClick = () => { },
    count = 8
}) => (
    <button onClick={onClick} className="button">
        {loadMore['en']} ({count})
    </button>
)