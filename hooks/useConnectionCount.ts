"use client";

import { useState, useEffect, useRef } from "react";

export function useConnectionCount(websocketUrl: string) {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!websocketUrl) {
      setIsConnected(false);
      return;
    }

    // Function to connect to WebSocket
    const connect = () => {
      try {
        console.log("Connecting to WebSocket:", websocketUrl);
        ws.current = new WebSocket(websocketUrl);

        ws.current.onopen = () => {
          console.log("WebSocket connected");
          setIsConnected(true);
          setError(null);

          // Request connection count
          ws.current?.send(JSON.stringify({ type: "GET_COUNT" }));

          // Request count every 30 seconds
          const interval = setInterval(() => {
            if (ws.current?.readyState === WebSocket.OPEN) {
              ws.current.send(JSON.stringify({ type: "GET_COUNT" }));
            }
          }, 30000);

          return () => clearInterval(interval);
        };

        ws.current.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log("WebSocket message received:", message);

            if (message.type === "COUNT") {
              setCount(message.count);
            }
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        ws.current.onclose = () => {
          console.log("WebSocket disconnected");
          setIsConnected(false);

          // Try to reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 3000);
        };

        ws.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          setError("Connection error");
        };
      } catch (error) {
        console.error("Failed to create WebSocket connection:", error);
        setError("Connection failed");
      }
    };

    // Connect on component mount
    connect();

    // Disconnect on component unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [websocketUrl]);

  return { count, isConnected, error };
}
