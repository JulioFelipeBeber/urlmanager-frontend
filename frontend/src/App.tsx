import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const handleShorten = async () => {
    if (!url.trim()) return;

    try {
      const response = await fetch("https://urlmanagerdev.onrender.com/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!response.ok) {
        throw new Error("Erro ao encurtar");
      }

      const data = await response.json();

      setShort(`https://urlmanagerdev.onrender.com/api/r/${data.shortUrl}`);

    } catch (error) {
      alert("Erro ao encurtar URL");
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Digite a URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleShorten}>Encurtar URL</button>

      {short && (
        <p>
          <a href={short} target="_blank" rel="noreferrer">{short}</a>
        </p>
      )}
    </div>
  );
}

export default App;
