import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar,Button} from 'antd';
import Nav from './Nav'

function ScreenSource() {

  const [sourceList, setSourceList] = useState([])
  const [langue, setLangue] = useState('fr')

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
function langueFR(){
  setLangue('fr')
  
}
function langueUS(){
  setLangue('us')
  
}
  useEffect(() => {
    const APIResultsLoading = async() => {
      const data = await fetch('https://newsapi.org/v2/sources?langue=fr&country='+langue+'&apiKey=bd7b254f9733466ca3117b3b3f347a76')
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()
  }, [langue])

console.log(langue)
  return (
    <div>
        <Nav/>
       
       <div className="Banner">
          <Button onClick={()=>langueFR()}>france</Button>
          <Button onClick={()=>langueUS()}>US</Button>
      </div>
       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

export default ScreenSource;
