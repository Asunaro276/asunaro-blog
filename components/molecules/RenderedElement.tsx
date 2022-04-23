type Props = {
  id: string
  text: string
  tag: string
}

export const RenderedElement = (props: Props) => {
  if (props.tag === "h1") {
    return (
      <div id={props.id}>
        <Heading1 text={props.text} />
      </div>
    ) 
  }
  if (props.tag === "h2") {
    return (
      <div id={props.id}>
        <Heading2 text={props.text} />
      </div>
    ) 
  }
  if (props.tag === "h3") {
    return (
      <div id={props.id}>
        <Heading3 text={props.text} />
      </div>
    ) 
  }
  if (props.tag === "h4") {
    return (
      <div id={props.id}>
        <Heading4 text={props.text} />
      </div>
    ) 
  }
  if (props.tag === "h5") {
    return (
      <div id={props.id}>
        <Heading5 text={props.text} />
      </div>
    ) 
  }
  
  return (
    <div id={props.id}>
      <Paragraph text={props.text} />
    </div>
  ) 
}

const Heading1 = ({ text }: { text: string }) => {
  return (
    <div className="bg-slate-100 my-10 flex">
      <div className="w-2 bg-yellow-400"></div>
      <h1 className="ml-8 my-5 text-3xl font-semibold font-body">
        {text}
      </h1>
    </div>
  )
}

const Heading2 = ({ text }: { text: string }) => {
  return (
    <div className="my-8 flex">
      <div className="w-2 bg-yellow-400"></div>
      <h2 className="ml-4 my-2 text-xl font-semibold font-body">
        {text}
      </h2>
    </div>
  )
}

const Heading3 = ({ text }: { text: string }) => {
  return (
    <div className="my-5">
      <div className="w-3"></div>
      <h3 className="ml-6 my-2 font-semibold text-xl font-body">
        {text}
      </h3>
    </div>
  )
}

const Heading4 = ({ text }: { text: string }) => {
  return (
    <div>
      <h4>
        {text}
      </h4>
    </div>
  )
}

const Heading5 = ({ text }: { text: string }) => {
  return (
    <div>
      <h5>
        {text}
      </h5>
    </div>
  )
}

const Paragraph = ({ text }: { text: string }) => {
  return (
    <div className="mb-20">
      <p className="text-lg font-body">
        {text}
      </p>
    </div>
  )
}
