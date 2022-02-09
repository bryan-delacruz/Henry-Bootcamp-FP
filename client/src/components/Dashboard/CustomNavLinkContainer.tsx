import { FC } from "react";
import styled from "styled-components";

const CustomNavLink = styled.li`
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(p) => p.theme.colors.typography.darkest};
`;
const CustomNavLink2 = styled.li`
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(p) => p.theme.colors.typography.darkest};
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const LinkImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  gap: 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const LinkImg2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  gap: 1rem;
  border-radius: 0.5rem;
  color: white;
  margin-right: 1rem;
  background-color: ${(p) => p.theme.colors.details.primary};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;
interface props {
  select: boolean;
  svg_path: string;
  text: string;
}

const CustomNavLinkContainer: FC<props> = ({ select, svg_path, text }) => {
  let path = "";
  if (svg_path === "perfil") {
    path =
      "M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z";
  }
  if (svg_path === "users") {
    path =
      "M10.119 16.064c2.293-.53 4.427-.994 3.394-2.946-3.147-5.941-.835-9.118 2.488-9.118 3.388 0 5.643 3.299 2.488 9.119-1.065 1.964 1.149 2.427 3.393 2.946 1.985.458 2.118 1.428 2.118 3.107l-.003.828h-1.329c0-2.089.083-2.367-1.226-2.669-1.901-.438-3.695-.852-4.351-2.304-.239-.53-.395-1.402.226-2.543 1.372-2.532 1.719-4.726.949-6.017-.902-1.517-3.617-1.509-4.512-.022-.768 1.273-.426 3.479.936 6.05.607 1.146.447 2.016.206 2.543-.66 1.445-2.472 1.863-4.39 2.305-1.252.29-1.172.588-1.172 2.657h-1.331c0-2.196-.176-3.406 2.116-3.936zm-10.117 3.936h1.329c0-1.918-.186-1.385 1.824-1.973 1.014-.295 1.91-.723 2.316-1.612.212-.463.355-1.22-.162-2.197-.952-1.798-1.219-3.374-.712-4.215.547-.909 2.27-.908 2.819.015.935 1.567-.793 3.982-1.02 4.982h1.396c.44-1 1.206-2.208 1.206-3.9 0-2.01-1.312-3.1-2.998-3.1-2.493 0-4.227 2.383-1.866 6.839.774 1.464-.826 1.812-2.545 2.209-1.49.345-1.589 1.072-1.589 2.334l.002.618z";
  }
  if (svg_path === "categories") {
    path =
      "M10.452 2l8.271 8.265-5.431 5.279-8.292-8.314v-5.23h5.452zm.828-2h-8.28v8.058l10.271 10.296 8.302-8.07-10.293-10.284zm-1.72 6.559c-.585.585-1.535.585-2.12 0-.586-.584-.586-1.533 0-2.118.585-.585 1.535-.585 2.12 0 .586.584.586 1.533 0 2.118zm11.01 7.407l1.43 1.409-8.688 8.625-10.312-10.317v-2.833l10.349 10.291 7.221-7.175z";
  }
  if (svg_path === "news") {
    path =
      "M7 10h-3v-1h3v1zm6 2h3v-1h-3v1zm3-5h-12v1h12v-1zm0 6h-12v1h12v-1zm0 2h-12v1h12v-1zm0-6h-3v1h3v-1zm-4 3v-3h-4v3h4zm-1.055-7.312l.238 1.284h.5l.501-1.941h-.482l-.249 1.32-.238-1.32h-.492l-.27 1.345-.24-1.345h-.505l.46 1.941h.506l.271-1.284zm-6.945 7.312h3v-1h-3v1zm18.44 4.277c.183-2.314-.433-2.54-3.288-5.322.171 1.223.528 3.397.911 5.001.089.382-.416.621-.586.215-.204-.495-.535-2.602-.82-4.72-.154-1.134-1.661-.995-1.657.177.005 1.822.003 3.341 0 6.041-.003 2.303 1.046 2.348 1.819 4.931.132.444.246.927.339 1.399l3.842-1.339c-1.339-2.621-.693-4.689-.56-6.383zm-6.428 1.723h-13.012v-16h14v7.894c.646-.342 1.348-.274 1.877.101l.123-.018v-8.477c0-.828-.672-1.5-1.5-1.5h-15c-.828 0-1.5.671-1.5 1.5v17c0 .829.672 1.5 1.5 1.5h13.974c-.245-.515-.425-1.124-.462-2zm-3.166-12.396c-.149 0-.324-.043-.466-.116l-.024-.013-.098.398.015.008c.102.058.318.119.547.119.581 0 .788-.328.788-.61 0-.272-.161-.458-.507-.586-.254-.096-.338-.145-.338-.247 0-.098.1-.161.254-.161.136 0 .266.03.388.088l.023.011.107-.39-.015-.007c-.145-.065-.311-.098-.495-.098-.442 0-.739.239-.739.593 0 .262.181.458.535.581.227.081.304.144.304.247 0 .117-.102.183-.279.183zm-5.325.368h.485v-1.941h-.438v1.189l-.64-1.189h-.536v1.941h.438v-1.327l.691 1.327zm2.028-1.545v-.396h-1.215v1.941h1.255v-.396h-.78v-.406h.698v-.393h-.698v-.35h.74z";
  }

  return select ? (
    <CustomNavLink2>
      <LinkImg2>
        <svg
          fill="currentColor"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path} />
        </svg>
      </LinkImg2>
      {text}
    </CustomNavLink2>
  ) : (
    <CustomNavLink>
      <LinkImg>
        <svg
          fill="currentColor"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path} />
        </svg>
      </LinkImg>
      {text}
    </CustomNavLink>
  );
};

export default CustomNavLinkContainer;
