export default function PageContent({className, children}) { 
    return (
        <div className={className}>
            {children}
        </div>
    );
}