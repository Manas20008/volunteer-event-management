import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "System" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "You" }]);
    setInput("");
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "20px auto", padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Volunteer Chat
      </Typography>
      <List sx={{ maxHeight: 300, overflow: "auto", marginBottom: 2, bgcolor: "#f9f9f9", padding: 1 }}>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <strong>{msg.sender}:&nbsp;</strong> {msg.text}
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          label="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatBox;
