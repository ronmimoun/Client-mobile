import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import PageLayout from "../../layout/PageLayout/PageLayout";

const Categories = () => {
  const { categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );

  return (
    <PageLayout title={PAGES_TITLE.CATEGORIES_PAGE.TITLE_NAME}>
      <div className="category-area">
        <div className="container">
          <div className="row category-wrapper">
            {categories.map((category) => {
              return (
                <div className="col-12" key={category._id}>
                  <Link
                    to={"/contacts/" + category.cat}
                    className="single-category bg-img"
                    style={{
                      backgroundImage: `url(${category.img})`,
                    }}
                  >
                    {/* <span className="single-category__image">
                      <img
                        src={process.env.PUBLIC_URL + category.img}
                        className="injectable"
                        alt=""
                      />
                    </span> */}
                    <span className="single-category__title">
                      {category.title}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Categories;
