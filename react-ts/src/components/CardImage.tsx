function CardImage({ thumbnailUrl, title }: { thumbnailUrl: string; title: string }) {
    return (

        <img
            src={thumbnailUrl}
            className="card-img-top"
            alt={title}
            style={{ maxHeight: "300px", objectFit: "cover" }}
        />
    );
}
export default CardImage;