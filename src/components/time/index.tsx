import { useContext, useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'


const Timer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTime = () => {
    const mins = Math.floor(seconds / 60)

    const secs = seconds % 60

    return `${mins > 9 ? mins : `0${mins}`} : ${secs > 9 ? secs : `0${secs}`}`
  }

  console.log(seconds)

  return(
    <section className={css(component.container)}>
      <div className={css(component.text)}>
        {getTime()}
      </div>
    </section>
  )
}

const component = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%'
  },
  text: {
    fontSize: 12,
    fontWeight: 800,
    color: 'var(--dark-clr)'
  }
})

export default Timer