import React from 'react';
function Message() {
const [data, setData] = React.useState(null);
React.useEffect(() => {
fetch('/api')
.then((res) => res.json())
.then((info) => setData(info.message));
}, []);
return (
<div>
<header>
<p>{!data ? "Loading..." : data}</p>
</header>
</div>
);
}
export default Message;
