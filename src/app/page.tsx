"use client"
import { useDispatch, useSelector } from "react-redux"
import { StateFaces } from "../../InterFaces/StateFaces"
import { Up } from "@/lib/CounterSlices"
import { useEffect } from "react"
import { GetAllPosts } from "@/lib/PostsSlices"
export default function Home() {
  const Dispatch = useDispatch<any>()
  const { Counter } = useSelector((state: StateFaces) => {
    return state.CounterReducer
  })
  const { AllPosts } = useSelector((state: StateFaces) => state.PostsReducer)
  useEffect(() => {
    Dispatch(GetAllPosts())
  }, [])
  return <div>
    <div className="flex justify-center text-center flex-col animate-fade-up animate-once">
      <h1>hi </h1>
      <h2>{Counter}</h2>
      <button onClick={() => Dispatch(Up(1))} className="btn btn-info">Add</button>
      {AllPosts?.map((post: any) => {
        return <div key={post.id}>{post.body}</div>
      })}
    </div>
  </div >
}
