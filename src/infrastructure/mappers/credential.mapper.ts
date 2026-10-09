import { Types } from "mongoose";
import { ICredential } from "../models/credential.model";
import { Credential } from "../../domain/entities/credential.entity";

export class CredentialMapper {
  static toDomain(doc: ICredential): Credential {
    return new Credential({
      _id: doc._id.toString(),
      userId: doc.userId.toString(),
      google: doc.google,
      notion: doc.notion,
      whatsApp: doc.whatsApp,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Credential) {
    const props = entity.getProps();

    return {
      userId: new Types.ObjectId(props.userId),
      google: props.google,
      notion: props.notion,
      whatsApp: props.whatsApp,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
