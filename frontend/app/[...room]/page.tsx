export default function Page({ params }: { params: { room: string } }) {
    return <div>My Post: {params.room}</div>
}

