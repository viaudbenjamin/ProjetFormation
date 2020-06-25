import React, {useState,useEffect} from 'react';
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';
const { Meta } = Card;


function ScreenMyArticles(props) {

  const FakeArticles = [
    { title: 'Bitcoin Power', description: 'Le bitcoin revient de très loin et peut toujours...', img: './images/bitcoin.jpg', content: "L’agenda politique sur la monnaie numérique publique, ainsi que ma récente visite du Musée créé par la Banque de France m’ont conduit à de multiples réflexions. Qu’un ministre ne veuille pas de monnaie privée sur notre sol (curieux, d’ailleurs que ce soit précisément ce mot à double sens qui affleure ici) c’est une chose. Que la chose soit impensable en est une autre.On va parler ici d’une monnaie privée émise justement par… un ministre, et pas n’importe lequel. Au cœur de l’appareil d’Etat, et en plein centre de la France. " },
    { title: "Sauver l'Alaska", description: 'Le réchaffement climatique devrait concerner tout...', img: './images/alaska.jpg', content: "Peuplé par des Aléoutes, Esquimaux (notamment Iñupiak et Yupiks) et peut-être d'autres Amérindiens depuis plusieurs millénaires, le territoire est colonisé par des trappeurs russes à la fin du xviiie siècle. L'Alaska vit alors essentiellement du commerce du bois et de la traite des fourrures. En 1867, les États-Unis l'achètent à la Russie pour la somme de 7,2 millions de dollars (environ 120 millions de dollars actuels), et celui-ci adhère à l'Union le 3 janvier 1959. Les domaines économiques prédominants aujourd'hui sont la pêche, le tourisme, et surtout la production d'hydrocarbures (pétrole, gaz) depuis la découverte de gisements à Prudhoe Bay dans les années 1970." },
    { name: "Gilets Jaune", description: 'Encore un samedi agité en IDF selon...', img: './images/giletjaune.jpg', content: "Selon une information de La Provence, ce samedi, deux « gilets jaunes » ont été interptions par les manifestants. En novembre, une dizaine de personnes avait ainsi été interpellée par la police après le saccage du péage et un incendie volontaire." }
  ]
  var articleNull;
const [articleList,setArticleList]=useState([])
const [compteList,setCompteList]=useState(null)
  if(articleList.length==0){
    articleNull = 'No Articles'
  }

  useEffect(() => {
    if(compteList==null){
      enregisterArticle(props.myArticle)  
    }
      const recupArticle = async ()=>{
        const data = await fetch('/get_article')
        const reponse = await data.json()
        setArticleList(reponse.article)
        setCompteList(reponse.article.length)
      }
      recupArticle()
  },[compteList])
console.log(compteList)


async function enregisterArticle(article){
  for(var i=0;i<article.length;i++){
    const data = await fetch(`/add_article`,{
    method:'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: "titre="+article[i].article.title+"&description="+article[i].article.description+"&url="+article[i].article.urlToImage
  
  })
  props.supprArticle(article[i].article.title)
  }
}
async function supprArticleBDD(indice){
  console.log(indice)
  await fetch('/suppr_article/'+indice,{
    method:'DELETE'
  })
  setCompteList(compteList - 1 )
}


  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articleNull}
        {articleList.map((article,i)=>(
          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            style={{
              width: 300,
              margin: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            cover={
              <img
                alt="example"
                src={article.url}
              />
            }
            actions={[
              <Icon type="read" key="ellipsis2" />,
              <Icon type="delete" key="ellipsis" /* onClick={()=>props.supprArticle(article.titre)}  */onClick={()=>supprArticleBDD(article.titre)} />
            ]}
          >
            <Meta
            title={article.titre} 
              description={article.description}
            />
          </Card>
          </div>
        ))}
        
      
      </div>
    </div>
  );
}
function mapDispatchToProps(dispatch){
  return{
    supprArticle:function(indice){
      dispatch({type: 'suppr',indice:indice})
    }
  }
} 
  function mapStateToProps(state){
    return {myArticle :state.article}
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenMyArticles);
