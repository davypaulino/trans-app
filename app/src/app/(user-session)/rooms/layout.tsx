export default function RoomViewLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section className="container mx-auto flex row justify-around items-center">
            {children}
        </section>
    )
}