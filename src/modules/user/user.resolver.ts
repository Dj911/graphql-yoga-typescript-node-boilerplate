import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "./user.types";
import UserService from "./user.service";
import { NewUserInput } from "./user.inputs";

@Resolver(User)
class UserResolver {
  constructor(private userService: UserService) {}

  @Query(_returns => User)
  async recipe(@Arg("id") id: string) {
    // const recipe = await this.userService.findById(id);
    // if (recipe === undefined) {
    //   throw new Error(id);
    // }
    return 'recipe';
  }

  // @Query(_returns => [User])
  // recipes(@Args() { skip, take }: RecipesArgs) {
  //   // return this.userService.findAll({ skip, take });
  // }

  @Mutation(_returns => User)
  // @Authorized()
  addRecipe(
    @Arg("newRecipeData") newRecipeData: NewUserInput,
    @Ctx("user") user: User,
  ) {
    // this.userService.addNew({ data: newRecipeData, user });
    return "" 
  }

  // @Mutation(_returns => Boolean)
  // @Authorized(Roles.Admin)
  // async removeRecipe(@Arg("id") id: string) {
  //   try {
  //     // await this.userService.removeById(id);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
}

export default UserResolver