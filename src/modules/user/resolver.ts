import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {RegisterUser, User} from "@user/schema";
import {UserService} from "@user/service";
import { UserProfileUpdate, UserRegisterInput } from "@user/inputs";
import { Service } from "typedi";
import { UserRegisterResponse } from "@user/response";


@Service()
@Resolver(of=> User)
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserRegisterResponse)
  async getUserById(@Arg("id") id: string) {

    return await this.userService.getUserById(id);
  }

  @Mutation(returns => RegisterUser)
  async registerUser(@Arg('payload') payload: UserRegisterInput){
    return this.userService.createUser(payload)
  }

  // @Query(returns => [User])
  // recipes(@Args() { skip, take }: RecipesArgs) {
  //   // return this.userService.findAll({ skip, take });
  // }

  @Mutation(returns => User)
  // @Authorized()
  addRecipe(
    @Arg("newRecipeData") newRecipeData: UserProfileUpdate,
    @Ctx("user") user: User,
  ) {
    // this.userService.addNew({ data: newRecipeData, user });
    return "" 
  }

  // @Mutation(returns => Boolean)
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