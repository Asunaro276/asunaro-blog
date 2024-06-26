import { useEffect, useState } from "react";

export const useCodeCopy = () => {
  const [ copied, setCopied ] = useState(false);
  useEffect(() => {
    const elements = Array.from(document.getElementsByClassName('clipboard'))
    elements.forEach((element) => {
      element.addEventListener('click', async () => {
        await navigator.clipboard.writeText(String(element.nextElementSibling?.textContent))
        setCopied(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setCopied(false)
      })
      element.parentElement?.addEventListener('mouseover', () => {
        (element as HTMLElement).style.display = 'flex'
      })
      element.parentElement?.addEventListener('mouseout', () => {
        (element as HTMLElement).style.display = 'none'
      })
    })
  }, [])
  useEffect(() => {
    if (copied) {
      document.querySelectorAll('.copied').forEach((element) => {
        (element as HTMLElement).style.display = ''
      })
    } else {
      document.querySelectorAll('.copied').forEach((element) => {
        (element as HTMLElement).style.display = 'none'
      })
    }
  }, [copied])
}
