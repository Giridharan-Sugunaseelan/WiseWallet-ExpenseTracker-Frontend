export {Home};
    import Content_tile_1 from "../comp/Content-tile/Content-tile-1"
    import Content_tile_2 from "../comp/Content-tile/Content-tile-2";
    import Footer from "./Footer";
import Header from "./Header";
function Home(){
    return(
        <>
            <Header/>
            <Content_tile_1 
            src="https://picsum.photos/200/300/?blur"
            alt="image"
            title="Simplify Your Finances with Our Expense Tracker"
            content="Do you find it challenging to keep track of your expenses and manage your finances effectively? The constant hustle of daily life often leaves us struggling to remember where our money goes. Our expense tracker app is designed to alleviate the difficulties associated with financial tracking, providing you with a user-friendly solution to gain control over your spending habits."
            />
            <Content_tile_2 
            src="https://picsum.photos/200/300/?blur"
            alt="image"
            title="Gain Insight, Take Control"
            content="Our expense tracker app empowers you to take control of your finances effortlessly. With the ability to log both income and expenses, you can easily update and categorize your transactions. Whether it's a paycheck or a coffee run, every financial move is stored securely. The app's intuitive design allows users to visualize their spending patterns through detailed graphs and pie charts, categorized by expenses. Want to know how much you spent on dining out last month? Curious about your entertainment budget? Our app provides comprehensive statistics, helping you analyze and plan your budget with ease"
            />
            <Content_tile_1 
            src="https://picsum.photos/200/300/?blur"
            alt="image"
            title="Financial Freedom at Your Fingertips"
            content="Embark on a journey towards financial freedom with our all-in-one expense tracker app. Beyond just logging transactions, our app offers insightful budgeting features. Set personalized spending limits for each category, and receive timely alerts to help you stay within your budgetary goals. Worried about recurring bills? The app’s reminder feature ensures you never miss a payment. We believe that financial well-being is about more than just tracking expenses; it's about gaining control, making informed decisions, and achieving peace of mind."
            />
            <Footer/>  
        </>
    );
}