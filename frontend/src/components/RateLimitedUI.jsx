import { ZapIcon } from 'lucide-react'

const RateLimitedUI = () => {
  return (
    <section className='max-w-6xl mx-auto py-8 px-4'>
        <div className='bg-primary/5 border border-secondary/30 rounded-lg shadow-md'>
            <div className='flex flex-col md:flex-row items-center p-6'>
                <div className='bg-secondary/25 p-6 rounded-full mb-4 md:mb-0 md:mr-6'>
                    <ZapIcon className='size-10 text-primary' />
                </div>
                <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-xl font-bold mb-2'>Rate Limit Reached</h3>
                    <p className='text-base-content mb-1'>
                        You've made too many requests in a short period. Please wait a moment.
                    </p>
                    <p className='text-base-content text-sm'>
                        Try again in a few seconds for the best experience.
                    </p>
                </div>
            </div>
        </div> 
    </section>
  )
}

export default RateLimitedUI