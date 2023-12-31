import DetailsPage from "@/component/templates/DetailsPage";
import { useRouter } from "next/router";



export default function Details({ data }) {
    const router = useRouter()
    if(router.isFallback) return <h2>Loading Page...</h2>;
    return <DetailsPage {...data}/>
}


export async function getStaticPaths() {
    const res = await fetch('http://localhost:4000/data');
    const json = await res.json();
    const data = json.splice(0, 10);
    const paths = data.map(food => ({
        params: { id: food.id.toString() },
    }));
    return {
        paths,
        fallback: true
    };
};

export async function getStaticProps(context) {
    const { params: {id} } = context;
    const res = await fetch(`http://localhost:4000/data/${id}`);
    const data = await res.json();
    if(!data.id) return { notFound: true, }
    return {
        props: { data },
        revalidate: 1800,
    }
}

