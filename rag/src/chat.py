CHAT_HTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>{title}</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }}
            .chat-container {{
                width: 100%;
                max-width: 600px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                box-sizing: border-box;
            }}
            h1 {{
                text-align: center;
                color: #333;
            }}
            #messages {{ 
                height: 400px; 
                overflow-y: auto; 
                border: 1px solid #ccc; 
                padding: 10px; 
                margin-bottom: 10px;
                border-radius: 8px;
                background-color: #fafafa;
            }}
            .message {{
                margin: 5px 0;
                padding: 10px;
                border-radius: 8px;
                max-width: 80%;
                word-wrap: break-word;
            }}
            .user {{ 
                background-color: #e3f2fd; 
                align-self: flex-end;
            }}
            .assistant {{ 
                background-color: #f5f5f5; 
                align-self: flex-start;
            }}
            .input-container {{
                display: flex;
                justify-content: space-between;
            }}
            #messageText {{
                flex: 1;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 8px;
                margin-right: 10px;
                box-sizing: border-box;
            }}
            button {{
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                background-color: #007bff;
                color: #fff;
                cursor: pointer;
                transition: background-color 0.3s;
            }}
            button:hover {{
                background-color: #0056b3;
            }}
        </style>
    </head>
    <body>
        <div class="chat-container">
            <h1>{title}</h1>
            <p>{description}</p>
            <div id="messages"></div>
            <div class="input-container">
                <input type="text" id="messageText" placeholder="Type your message...">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>

        <script>
            const messages = document.getElementById('messages');
            const messageText = document.getElementById('messageText');
            const ws = new WebSocket(`wss://chat.larek.tech/pipeline/{pipeline_id}/ws`);

            ws.onmessage = function(event) {{
                const data = JSON.parse(event.data);
                if (data.type === 'chunk') {{
                    // Create or update the current response
                    let currentResponse = document.querySelector('.current-response');
                    if (!currentResponse) {{
                        currentResponse = document.createElement('div');
                        currentResponse.className = 'message assistant current-response';
                        messages.appendChild(currentResponse);
                    }}
                    currentResponse.textContent += data.content;
                }} else if (data.type === 'done') {{
                    const currentResponse = document.querySelector('.current-response');
                    if (currentResponse) {{
                        currentResponse.classList.remove('current-response');
                    }}
                    messages.scrollTop = messages.scrollHeight;
                }}
            }};

            function sendMessage() {{
                const message = messageText.value;
                if (message) {{
                    // Add user message to chat
                    const userDiv = document.createElement('div');
                    userDiv.className = 'message user';
                    userDiv.textContent = message;
                    messages.appendChild(userDiv);
                    
                    // Send to websocket
                    ws.send(JSON.stringify({{query: message}}));
                    
                    // Clear input
                    messageText.value = '';
                    messages.scrollTop = messages.scrollHeight;
                }}
            }}

            // Handle Enter key
            messageText.addEventListener('keypress', function(e) {{
                if (e.key === 'Enter') {{
                    sendMessage();
                }}
            }});
        </script>
    </body>
</html>
"""
