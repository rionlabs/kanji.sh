### TODO: Configure Headers
```
{
    source: '/assets/:path(json|jpg|png|svg)',
    headers: [
        {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate',
        },
    ],
}
```

### TODO: Configure Redirects
```
{
    source: '/write/collection/:key',
    destination: '/write/:key',
    permanent: true
}
```