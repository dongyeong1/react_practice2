import React from 'react';
import 'antd/dist/antd.css'
import propTypes from 'prop-types'
import Head from 'next/head'

import wrapper from '../store/configureStore';
const App=({Component})=>{
    return(
        <>
        <Head>
            <title>dongReactPage</title>
        </Head>
        <Component/>
        </>

    )

}
App.propTypes={
    Component:propTypes.elementType.isRequired,
}
export default wrapper.withRedux(App);
// export default App