import notFoundSvg from 'assets/404.svg';

export default function PageNotFound() {
   return (
      <div>
         <img src={notFoundSvg} />
         <p>Page Not Found</p>
         {/* <Button onClick={() => navigate(-1)}>Go Back</Button> */}
      </div>
   );
}
