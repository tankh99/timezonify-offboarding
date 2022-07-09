import { Button, Checkbox, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2';
import timezonifyLogo from '../public/timezonify-logo.png'

/* options
1. difficult to use
3. clearing unused extension
4. slows down my computer
5. doesn't have the featrues I want
  - What features do you want?
*/

const SERVICE_ID=process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!
const TEMPLATE_ID=process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!
const PUBLIC_KEY=process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!


const Home: NextPage = () => {

  const [showFeatures, setShowFeatures] = useState(false)

  const [showDoesNotWork, setShowDoesNotWork] = useState(false)

  const form = useForm({
    initialValues: {
      features: false,
      whatFeatures: "",
      difficult: false,
      doesNotWork: false,
      whatDoesNotWork: "",
      otherImprovements: ""
    }
  })

  const handleSubmit = async (values: any,e:any) => {
    console.log(values)
    console.log(e)
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY)
    console.log(response)

    Swal.fire(
      "Email sent",
      "Your feedback is greatly appreciated",
      "success"
    )
  }

  return (
    <div className='w-full h-full text-lg'>
      <div className="flex justify-between items-center px-4 py-2 bg-blue-200 h-14 fixed top-0 left-0 w-full">
        <div className="flex items-center" >
          <div className="mr-4 " style={{width: 40}}>
            <Image src={timezonifyLogo} layout="responsive" alt="Timezonify Logo" height={200} width={200}/>
          </div>
          <div className="font-bold text-2xl">
            Timezonify
          </div>
        </div>
        <Link 
          href="https://chrome.google.com/webstore/detail/timezonify/blaebhbhlcdbeiepibjlnpcphmcokjpo?hl=en-GB&authuser=1">
            <div className="p-2 bg-yellow-400 cursor-pointer rounded hover:translate-y-0.5 transition-all drop-shadow">
            Reinstall Extension
            </div>
        </Link>
      </div>
      <div className='text-4xl font-bold text-center mt-20'>Help Us Improve</div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <div>
          
        <div className='text-xl font-bold text-left mb-2'>Why did you uninstall Timezonify?</div>
          {/* Feedback */}
          <form 
            className="my-4"
            onSubmit={form.onSubmit((values, e) => handleSubmit(values, e))}>

          <CustomCheckbox
              name="features"
              label="Doesn't have the features I want"
              {...form.getInputProps("features", {type: "checkbox"})} 
              onClick={(e: any) => {
                setShowFeatures(e.target.checked)
              }}/>
            {showFeatures && (
              <div className='bg-gray-200 p-4 my-2'>
                <Textarea label="What features would you like?"
                  name="whatFeatures"
                  // onChange={(e) => form.setFieldValue("difficult", e.currentTarget.value)}
                  {...form.getInputProps("whatFeatures")}/>
              </div>  
              )}
            <CustomCheckbox
            name="difficult"
              label="Difficult to use"
              {...form.getInputProps("difficult", {type: "checkbox"})} />

            <CustomCheckbox
            name="doesNotWork"
              label="Timezonify doesn't work"
              onClick={(e: any) => {
                setShowDoesNotWork(e.target.checked)
              }}
              {...form.getInputProps("doesNotWork", {type: "checkbox"})} />
            {showDoesNotWork && (
              <div className='bg-gray-200 p-4 my-2'>
                <Textarea label="What features would you like?"
                name="whatDoesNotWork"
                  // onChange={(e) => form.setFieldValue("difficult", e.currentTarget.value)}
                  {...form.getInputProps("whatDoesNotWork")}/>
              </div>  
              )}

            
            <Textarea label="How else can we improve Timezonify?"
            className=""
            {...form.getInputProps("otherImprovements")}/>
            <button className="py-2 px-4 mt-2 bg-yellow-400 rounded hover:translate-y-0.5 transition-all drop-shadow">
              Submit
            </button>
          </form>

        </div>
        <div>
          <div className="font-bold text-xl mb-2">Developer&apos;s Message</div>
          <div className="bg-gray-100 p-4">
            Hi there. <br/><br/>
            I&apos;m Khang Hou and I developed Timezonify alone as a personal project. I would love to hear your feedback so that I can improve the extension and make the experience for future users a better one.
            I created Timezonify as a means of making it convenient for myself and others like me to convert between timezones without needing to Google it, and I&apos;d like to maintain that vision. If you have any criticism or feedback on the extension, providing it will help me understand in which direction I need to bring this extension towards.
            <br/><br/>
            Your feedback is greatly appreciated. Thank you very much.
          </div>
        </div>
      </div>
    </div>
  )
}

export function CustomCheckbox({...rest} :any){
  return (

    <Checkbox
      className='select-none my-2 cursor-pointer'
      size="lg"
      {...rest} />
  )
}

export default Home
