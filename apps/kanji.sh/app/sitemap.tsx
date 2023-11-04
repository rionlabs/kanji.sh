import { GetServerSideProps } from 'next';

async function generateSiteMap() {
    return `<xml version="1.0" encoding="UTF-8">
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://kanji.sh</loc>
       <lastmod>2021-06-01</lastmod>
     </url>
   </urlset>
   </xml>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res: response }) => {
    const sitemap = generateSiteMap();
    response.setHeader('Content-Type', 'text/xml');
    response.write(sitemap);
    response.end();

    return {
        props: {}
    };
};

export default function Sitemap() {
    return null;
}
