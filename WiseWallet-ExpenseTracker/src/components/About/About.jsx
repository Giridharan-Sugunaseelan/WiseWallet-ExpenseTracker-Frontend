import React from 'react'
import Content_tile_1 from '../comp/Content-tile/Content-tile-1'
import Header from '../Home/Header'
import Footer from '../Home/Footer'


function About() {
  return (
    <>
        <Header/>
        <Content_tile_1 
            src="https://picsum.photos/200/300/?blur"
            alt="image"
            title="Financial Freedom at Your Fingertips"
            content="Embark on a journey towards financial freedom with our all-in-one expense tracker app. Beyond just logging transactions, our app offers insightful budgeting features. Set personalized spending limits for each category, and receive timely alerts to help you stay within your budgetary goals. Worried about recurring bills? The app’s reminder feature ensures you never miss a payment. We believe that financial well-being is about more than just tracking expenses; it's about gaining control, making informed decisions, and achieving peace of mind."
        />
         <Footer/>
    </>
  )
}

export default About