"use client"
import { useDispatch, useSelector } from "react-redux"
import { StateFaces } from "../../InterFaces/StateFaces"
export default function Home() {
  const Dispatch = useDispatch()
  const State = useSelector((state: StateFaces) => {
    return state.CounterReducer.Counter
  })

  return <div>
    <div className="flex justify-center text-center">
      <h1>hi </h1>
      <h2>{State}</h2>
    </div>
  </div>
}
