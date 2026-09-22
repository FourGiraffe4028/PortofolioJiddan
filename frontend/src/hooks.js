import { useEffect, useState } from "react";

export function useTyping(words, active = true, typeSpeed = 75, deleteSpeed = 38, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;
    const word = words[index % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, active, typeSpeed, deleteSpeed, pause]);

  return text;
}
