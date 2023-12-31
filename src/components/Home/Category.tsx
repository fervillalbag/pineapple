import type { CategoryProps } from "../../interface";
import { useCategories } from "../../hooks/categories";
import { Text } from "../../ui";
// import { useProductByCategory } from "../../hooks/products";

interface CategoryItemProps {
  category: CategoryProps;
  index: number;
  length: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  index,
  length,
}) => {
  // const { queryProduct } = useProductByCategory(category._id);
  // const qtyProducts = queryProduct.data?.length || 0;

  return <h1>hi</h1>;
  return (
    <div
      className={`w-min ${index === 0 ? "pl-5" : "pl-0"} ${
        index === length ? "pr-5 mr-0" : "pr-0 mr-3"
      }`}
    >
      <button className="border w-32 flex flex-col justify-end p-[10px] h-32 border-@sura-primary-900 border-b-4 rounded-md bg-white">
        <Text className="text-@sura-primary-900 font-semibold">
          {category.name}
        </Text>
        <Text className="font-semibold text-@sura-primary-900">
          {/* {qtyProducts} <span className="font-normal">productos</span> */}
        </Text>
      </button>
    </div>
  );
};

export default function Category() {
  const queryCategory = useCategories();

  if (queryCategory.isLoading) return <div>loading..</div>;
  if (queryCategory.isError) return <div>error..</div>;

  const lengthCategoryArray = queryCategory?.data.data
    ? queryCategory?.data.data.length - 1
    : 0;

  return (
    <div className="pb-8">
      <Text className="pl-5 text-[22px] mb-2 font-medium text-@sura-primary-900">
        Categorias
      </Text>

      <div className="mt-3 flex hide-scrollbar overflow-x-auto w-full">
        {!queryCategory.data.data ? (
          <div>no hay categoria</div>
        ) : (
          queryCategory.data.data.map(
            (category: CategoryProps, index: number) => {
              return (
                <CategoryItem
                  key={category._id}
                  index={index}
                  category={category}
                  length={lengthCategoryArray}
                />
              );
            }
          )
        )}
      </div>
    </div>
  );
}
