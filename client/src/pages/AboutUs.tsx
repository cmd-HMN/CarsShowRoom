import { motion } from 'framer-motion';

const AboutUs = () => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='flex'
    >
      <motion.div
        className="flex-grow"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex flex-col justify-center items-center bg-Dark p-7">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">About<span className='ml-1 text-orange-500'>Us</span></h1>

            <p className="text-sm mb-6 sm:text-lg">
              At Carz, we are dedicated to providing exceptional service and value. We pride ourselves on being:
            </p>

            <ul className="list-disc list-inside mb-6">
              <li className="text-sm sm:text-lg font-semibold">Reliable:</li>
              <p className="text-xs mt-1 sm:text-sm">
                We are committed to delivering on our promises and ensuring that our customers can count on us.
              </p>

              <li className="text-sm sm:text-lg font-semibold mt-4">Cost Effective:</li>
              <p className="text-xs mt-1 sm:text-sm">
                We offer competitive pricing without compromising on quality, making sure you get the best value for your money.
              </p>

              <li className="text-sm sm:text-lg  font-semibold mt-4">Friendly:</li>
              <p className="text-xs mt-1 sm:text-sm">
                Our team is approachable and always ready to assist you with a smile, ensuring a pleasant experience.
              </p>

              <li className="text-sm sm:text-lg font-semibold mt-4">Economical:</li>
              <p className="text-xs mt-1 sm:text-sm">
                We provide solutions that are not only cost-effective but also budget-friendly, helping you save more.
              </p>
            </ul>
          <div className='flex flex-row justify-between flex-wrap font-bold'>
                <a href='tel:"+(234)3214"' className='text-sm text-orange-500 hover:text-green-500'>Phone</a>     
                <a href='mailto:"hmnonly1029@gmail.com"' className='text-sm text-orange-500 hover:text-green-500'>Email</a>     
                <a href='http://github.com/cmd-HMN' className='text-sm text-orange-500 hover:text-green-500'>Contact</a>     
          </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
